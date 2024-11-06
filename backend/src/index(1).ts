import express, { Request, Response } from 'express';
import { DataSource } from 'typeorm';
import { University } from './entity/University'; // note the .js extension
import { Department } from './entity/Department';
import { Specialization } from './entity/Specialization';
import { Student } from './entity/Student';
import path from 'path';

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Assuming 'public' is the directory containing your HTML file

// Route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Adjust path as necessary
});
const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Global@786',
  database: 'university',
  synchronize: true,
  logging: true,
  entities: [University, Department, Specialization, Student],
  subscribers: [],
  migrations: [],
});

dataSource.initialize().then(() => {
  console.log('Connected to database');

  app.get('/universities', async (req: Request, res: Response) => {
    try {
      const universities = await dataSource.getRepository(University).find({
        relations: ['departments', 'departments.specializations', 'departments.specializations.students'],
      });
      res.json(universities);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching universities' });
    }
  });

  app.post('/universities', async (req: Request, res: Response) => {
    try {
      const university = new University();
      university.name = req.body.name;
      await dataSource.getRepository(University).save(university);
      res.json(university);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating university' });
    }
  });

  app.get('/universities/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const university = await dataSource.getRepository(University).findOne({
        where: { id },
        relations: ['departments', 'departments.specializations', 'departments.specializations.students'],
      });
      if (!university) {
        res.status(404).json({ message: 'University not found' });
      } else {
        res.json(university);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching university' });
    }
  });

  app.put('/universities/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const university = await dataSource.getRepository(University).findOne({
        where: { id },
      });
      if (!university) {
        res.status(404).json({ message: 'University not found' });
      } else {
        university.name = req.body.name;
        await dataSource.getRepository(University).save(university);
        res.json(university);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating university' });
    }
  });
  app.delete('/universities/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      await dataSource.getRepository(University).delete(id);
      res.json({ message: 'University deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting university' });
    }
  });

  //department code 

  app.get('/departments', async (req: Request, res: Response) => {
    try {
      const departments = await dataSource.getRepository(Department).find({
        relations: ['university', 'specializations', 'specializations.students'],
      });
      res.json(departments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching departments' });
    }
  });
  
  app.post('/departments', async (req: Request, res: Response) => {
    try {
      const department = new Department();
      department.name = req.body.name;
  
      // Fetch the university using the universityId from the request body
      const university = await dataSource.getRepository(University).findOne({
        where: { id: req.body.universityId },
      });
  
      // Check if the university exists
      if (!university) {
        res.status(404).json({ message: 'University Not found' });
    }
  
      // Set the university for the department
      department.university = university;
  
      // Save the department
      await dataSource.getRepository(Department).save(department);
      res.json(department);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating department' });
    }
  });
  
  
  app.get('/departments/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const department = await dataSource.getRepository(Department).findOne({
        where: { id },
        relations: ['university', 'specializations', 'specializations.students'],
      });
      if (!department) {
        res.status(404).json({ message: 'Department not found' });
      } else {
        res.json(department);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching department' });
    }
  });
  
  app.put('/departments/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const department = await dataSource.getRepository(Department).findOne({
        where: { id },
      });
      if (!department) {
        res.status(404).json({ message: 'Department not found' });
      } else {
        department.name = req.body.name;
        await dataSource.getRepository(Department).save(department);
        res.json(department);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating department' });
    }
  });
  
  app.delete('/departments/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      await dataSource.getRepository(Department).delete(id);
      res.json({ message: 'Department deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting department' });
    }
  });


  //specialization

  app.get('/specializations', async (req: Request, res: Response) => {
    try {
      const specializations = await dataSource.getRepository(Specialization).find({
        relations: ['department', 'students'],
      });
      res.json(specializations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching specializations' });
    }
  });
  
  app.post('/specializations', async (req: Request, res: Response) => {
    try {
      const specialization = new Specialization();
      specialization.name = req.body.name;
      const department = await dataSource.getRepository(Department).findOne({
        where: { id: req.body.departmentId },
      });
  
      // Check if the department exists
      if (!department) {
         res.status(404).json({ message: 'Department not found' });
      }
      specialization.department = department ;
      await dataSource.getRepository(Specialization).save(specialization);
      res.json(specialization);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating specialization' });
    }
  });
  
  app.get('/specializations/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const specialization = await dataSource.getRepository(Specialization).findOne({
        where: { id },
        relations: ['department', 'students'],
      });
      if (!specialization) {
        res.status(404).json({ message: 'Specialization not found' });
      } else {
        res.json(specialization);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching specialization' });
    }
  });
  
  app.put('/specializations/:id', async (req: Request, res: Response) => {
    try {
   const id = parseInt(req.params.id);
      const specialization = await dataSource.getRepository(Specialization).findOne({
        where: { id },
      });
      if (!specialization) {
        res.status(404).json({ message: 'Specialization not found' });
      } else {
        specialization.name = req.body.name;
        await dataSource.getRepository(Specialization).save(specialization);
        res.json(specialization);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating specialization' });
    }
  });
  
  app.delete('/specializations/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      await dataSource.getRepository(Specialization).delete(id);
      res.json({ message: 'Specialization deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting specialization' });
    }
  });

  //student code

  app.get('/students', async (req: Request, res: Response) => {
    try {
      const students = await dataSource.getRepository(Student).find({
        relations: ['specialization', 'specialization.department', 'specialization.department.university'],
      });
      res.json(students);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching students' });
    }
  });
  
  app.post('/students', async (req: Request, res: Response) => {
    try {
      const student = new Student();
      student.name = req.body.name;
      student.email = req.body.email;
      student.age = req.body.age;
      const specialization = await dataSource.getRepository(Specialization).findOne({
        where: { id: req.body.specializationId },
      });
      if (!specialization) {
         res.status(404).json({ message: 'Specialization not found' });
      }
  
      // Associate the specialization with the student
      student.specialization = specialization;
        await dataSource.getRepository(Student).save(student);
      res.json(student);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating student' });
    }
  });
  
  app.get('/students/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const student = await dataSource.getRepository(Student).findOne({
        where: { id },
        relations: ['specialization', 'specialization.department', 'specialization.department.university'],
      });
      if (!student) {
        res.status(404).json({ message: 'Student not found' });
      } else {
        res.json(student);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching student' });
    }
  });
  
  app.put('/students/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const student = await dataSource.getRepository(Student).findOne({
        where: { id },
      });
      if (!student) {
        res.status(404).json({ message: 'Student not found' });
      } else {
        student.name = req.body.name;
        student.email = req.body.email;
        student.age = req.body.age;
        await dataSource.getRepository(Student).save(student);
        res.json(student);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating student' });
    }
  });
  
  app.delete('/students/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      await dataSource.getRepository(Student).delete(id);
      res.json({ message: 'Student deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting student' });
    }
  });
  app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });
});