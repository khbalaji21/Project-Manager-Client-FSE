export class Task {
  public Id: number;
  public Name: string;
  public Project_Id: number;
  public Parent_Task: number;
  public Priority: number;
  public Start_Date: Date;
  public End_Date: Date;
  public User: number;
  public status: boolean;
}
