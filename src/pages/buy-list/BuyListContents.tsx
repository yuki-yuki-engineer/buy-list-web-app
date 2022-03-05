import InboxIcon from "@mui/icons-material/MoveToInbox";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { useCallback, useState, VFC } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import BuyItemList from "@/pages/buy-list/BuyItemList";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

export interface BuyListCategory {
  id: number;
  name: string;
  open: boolean;
  buyItems: BuyListItem[];
}

interface BuyListItem {
  id: number;
  name: string;
}

const BuyListContents: VFC = () => {
  const exampleList: BuyListCategory[] = [
    {
      id: 1,
      name: "西友",
      open: true,
      buyItems: [
        {
          id: 0,
          name: "キャベツ",
        },
        {
          id: 1,
          name: "玉ねぎ",
        },
        {
          id: 2,
          name: "メロン",
        },
      ],
    },
    {
      id: 2,
      name: "スギ薬局",
      open: true,
      buyItems: [
        {
          id: 3,
          name: "綿棒",
        },
        {
          id: 4,
          name: "トイレットペーパー",
        },
        {
          id: 5,
          name: "絆創膏",
        },
      ],
    },
  ];

  const [list, setExampleList] = useState(exampleList);
  const setOpen = useCallback((index: number) => {
    setExampleList((prevState) => {
      console.log("###############");
      return prevState.flatMap((item, listIndex) => {
        if (index === listIndex) {
          return {
            ...item,
            open: !item.open,
          };
        } else {
          return {
            ...item,
          };
        }
      });
    });
  }, []);

  const handleOnDragEnd = (result: DropResult) => {
    console.log(result);
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    if (result.type === "buy-list-category") {
      const reorderList = reorder<BuyListCategory>(
        list,
        result.source.index,
        result.destination.index,
      );

      setExampleList(reorderList);
    } else {
      list[parseInt(result.type, 10)].buyItems = reorder<BuyListItem>(
        list[parseInt(result.type, 10)].buyItems,
        result.source.index,
        result.destination.index,
      );
      setExampleList(list);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="droppable" type="buy-list-category">
            {(provided, snapshot) => (
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {list.map((item, index) => {
                  return (
                    <Draggable
                      key={`buy-list-category${item.id}`}
                      draggableId={`buy-list-category${item.id}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <ListItemButton onClick={() => setOpen(index)}>
                            <ListItemIcon>
                              <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={item.name} />
                            {item.open ? <ExpandLess /> : <ExpandMore />}
                          </ListItemButton>
                          {item.open ? (
                            <BuyItemList
                              parentIndex={index}
                              buyCategory={item}
                            />
                          ) : (
                            <></>
                          )}
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
    </Container>
  );
};

const reorder = <T,>(list: T[], startIndex: number, endIndex: number): T[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default BuyListContents;
