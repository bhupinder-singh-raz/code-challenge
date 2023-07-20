export interface listType {
  _id: string;
  name: string;
  viewed?: boolean;
  description: string;
  status: "New" | "Complete" |  "In Progress";
}