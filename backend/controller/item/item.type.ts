export type createItemApiPayload = {
  name: string;
  description?: string;
  status: "New" | "Complete" |  "In Progress";
};

export type getItemByNameApiParam = {
  name: string;
};


export type updateIemApiPayload = { _id: string; name: string, status?: string, description?: string }

export type deleteItemApiParams = { id: string };