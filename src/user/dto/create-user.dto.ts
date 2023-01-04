export class CreateUserDto {
  email: string;
  name: string;
  password: string;
  experience?: number;
  education?: string;
  salary: number;
  allocated_leave: number;
  remaining_leaves: number;
}
