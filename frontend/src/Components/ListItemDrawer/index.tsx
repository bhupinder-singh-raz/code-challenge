import React, { useEffect, useState } from 'react';
import {
  Checkbox,
  Drawer,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Box,
  TextField,
  Button,
  CircularProgress
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { ButtonStyle, FormContainerStyle, ListDrawerHeadingContainerStyle, cusorPointerStyle, drawerContainerStyle, inputStyle, inputWrapperStyle, labelStyle, submitButtonContainerStyle, titleStyle } from './styles';
import { IProps } from './types';
import AxiosService from '../../Services/api.service';
import { listType } from '../CustomList/types';
import CancelIcon from '@mui/icons-material/Cancel';

interface itemFormType {
  name: string;
  description: string;
  viewed: boolean;
  status: "New" | "Complete" | "In Progress" | "";
  operationToBePerformed: "Update" | "Delete" | "Add";
};

const ListItemDrawer: React.FC<IProps> = (props: IProps) => {
  const { name, description, viewed, status, drawerOpen, updateTheSelectedItem, itemId, refreshTheList } = props;
  const { register, control, handleSubmit, formState: { errors }, setValue, reset } = useForm<itemFormType>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    reset({
      name,
      description,
      status,
      viewed
    });
  }, [name]);

  const closeDrawer = () => {
    updateTheSelectedItem(true, undefined);
  }


  const updateDataInDB = async (data: itemFormType) => {
    const api = new AxiosService();
    await api.put<Array<listType>>('/item', { ...data, _id: itemId });
    refreshTheList("Updation Successful");
    setLoading(false);
    closeDrawer();
  }

  const deleteDataInDB = async (_id: string) => {
    const api = new AxiosService();
    await api.delete<Array<listType>>(`/item/${_id}`);
    refreshTheList("Deletion Successful");
    setLoading(false);
    closeDrawer();
  }

  const addNewDataInDB = async (data: itemFormType) => {
    const api = new AxiosService();
    await api.post<Array<listType>>(`/item/`, data);
    refreshTheList("Addition Of New Item Successful");
    setLoading(false);
    closeDrawer();
  }

  const onSubmit = async (data: itemFormType) => {
    if (data) {
      setLoading(true);
      if (data.operationToBePerformed === "Update") {
        updateDataInDB(data);
      }
      else if (data.operationToBePerformed === "Delete") {
        deleteDataInDB(itemId);
      }
      else if (data.operationToBePerformed === "Add") {
        addNewDataInDB(data);
      }
    }
    else {
      return;
    }
  };

  return (
    <Drawer
      open={drawerOpen}
      onClose={closeDrawer}
      anchor='right'
      variant='persistent'
      sx={drawerContainerStyle}
      PaperProps={{
        sx: { width: "350px" },
      }}
    >
      <Box
        sx={ListDrawerHeadingContainerStyle}
      >
        <Typography variant="h2" sx={titleStyle}>
          List drawer
        </Typography>
        <CancelIcon sx={cusorPointerStyle} onClick={closeDrawer} />
      </Box>

      <Box sx={FormContainerStyle}>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={inputWrapperStyle}>
            <Typography variant="body1" sx={labelStyle}>Name</Typography>
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              id="Item_Name"
              size="small"
              autoFocus
              {...register('name', {
                required: 'Name is required',
                maxLength: { value: 32, message: "Name should not exceed 32 characters" }
              })}
              defaultValue={name}
              sx={inputStyle}
              error={Boolean(errors?.name)}
              helperText={errors?.name?.message}
            />
          </Box>

          <Box sx={inputWrapperStyle}>
            <Typography variant="body1" sx={labelStyle}>Description</Typography>
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              id="Item_Name"
              size="small"
              autoFocus
              {...register('description', {
                required: 'Description is required',
                maxLength: { value: 100, message: "Description should not exceed 100 characters" }
              })}
              defaultValue={description}
              sx={inputStyle}
              error={Boolean(errors?.description)}
              helperText={errors?.description?.message}
            />
          </Box>

          <Controller
            name="viewed"
            control={control}
            defaultValue={viewed}
            render={({ field }) => (
              <FormControlLabel control={<Checkbox {...field} />} label="Viewed" />
            )}
          />

          <Typography variant="body1" sx={labelStyle}>Status</Typography>
          <Controller
            name="status"
            control={control}
            defaultValue={status}
            render={({ field }) => (
              <RadioGroup {...field}>
                <FormControlLabel value="New" control={<Radio />} label="New" />
                <FormControlLabel value="Complete" control={<Radio />} label="Complete" />
                <FormControlLabel value="In Progress" control={<Radio />} label="In Progress" />
              </RadioGroup>
            )}
          />

          
          <Typography variant="body1" sx={labelStyle}>Which Operation To Performed</Typography>
          <Controller
            name="operationToBePerformed"
            control={control}
            defaultValue={"Update"}
            render={({ field }) => (
              <RadioGroup {...field}>
                <FormControlLabel value="Delete" control={<Radio />} label="Delete" />
                <FormControlLabel value="Update" control={<Radio />} label="Update" />
                <FormControlLabel value="Add" control={<Radio />} label="Add New Item" />
              </RadioGroup>
            )}
          />
          
          <Box sx={submitButtonContainerStyle}>
            <Button type="submit" variant='outlined' sx={ButtonStyle}>{ loading ? <CircularProgress size={20} />  : "Submit" }</Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  );
};

export default React.memo(ListItemDrawer);
