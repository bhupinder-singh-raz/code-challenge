export interface IProps {
  drawerOpen: boolean;
  name: string;
  viewed: boolean;
  description: string;
  status: "New" | "Complete" | "In Progress";
  updateTheSelectedItem: (reset: boolean, index?: number,) => void;
  itemId: string;
  refreshTheList: (msg?: string) => void
}
