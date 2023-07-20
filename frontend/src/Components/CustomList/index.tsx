import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Box, Button, List, ListItem, useTheme } from '@mui/material';
import ListItemDrawer from '../ListItemDrawer';
import AxiosService from '../../Services/api.service';
import { listType } from './types';
import LoaderComponent from './../Loader/index'
import StarIcon from '@mui/icons-material/Star'
import { listContainerStyle, listStyle } from './styles';


const initialSelectedItemstate: listType = {
  _id: "",
  name: "",
  description: "",
  viewed: false,
  status: "New",
}


export function CustomList() {
  const theme = useTheme();
  const [list, setList] = useState<Array<listType>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<listType>({...initialSelectedItemstate});
  const [operationCompletionMsg, setOperationCompletionMsg] = useState<string>("");

  /**
   * component did mount
   */
  useEffect(() => {
    const getListFromBackend = async () => {
      try {
        refreshTheList();
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    getListFromBackend();
  }, []);


  const refreshTheList = useCallback(async (message?: string) => {
    const api = new AxiosService();
    const response = await api.get<Array<listType>>('/item');
    setList(response);
    if (message) {
      setOperationCompletionMsg(message);
      setTimeout(() => {
        setOperationCompletionMsg("");
      }, 1000);
    }
  }, []);

 
  const updateTheSelectedItem = useCallback((reset: boolean = false, index?: number) => {
    if (reset) {
      setSelectedItem({ ...initialSelectedItemstate });
    }
    else {
      setSelectedItem((prevState: listType) => {
        const selectedItem = list[index as number];
        return {
          ...selectedItem
        }
      });
    }
  }, [selectedItem, list]);


  return (
    <Box sx={listContainerStyle(theme)}>

      {
        loading ?
          <LoaderComponent /> :
          <List>
            {list?.map((item: listType, index: number) => (
              <Box sx={listStyle(theme)} key={item._id} onClick={() => updateTheSelectedItem(false, index)}>
                <StarIcon />
                <ListItem>{item.name}</ListItem>
              </Box>
            ))}
          </List>
      }

      {
        operationCompletionMsg &&
        <Box>
          <Alert severity="success">{operationCompletionMsg}!</Alert>
        </Box>
      }

      {
        Boolean(selectedItem._id) &&

        <ListItemDrawer
          itemId={selectedItem._id}
          name={selectedItem.name}
          description={selectedItem.description}
          viewed={selectedItem.viewed ?? false}
          drawerOpen={Boolean(selectedItem._id)}
          status={selectedItem.status}
          updateTheSelectedItem={updateTheSelectedItem}
          refreshTheList={refreshTheList}
        />
      }

    </Box>
  );
}
