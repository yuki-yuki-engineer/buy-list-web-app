import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { IconButton, ListItem } from "@mui/material";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { VFC } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { BuyListCategory } from "@/pages/buy-list/BuyListContents";

interface IProps {
  parentIndex: number;
  buyCategory: BuyListCategory;
}

const BuyItemList: VFC<IProps> = ({ parentIndex, buyCategory }) => {
  return (
    <Droppable
      droppableId={`droppable-buy-category-${parentIndex}`}
      type={`droppable-buy-category`}
    >
      {(provided) => (
        <List
          className="buy-items"
          component="div"
          disablePadding
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {buyCategory.buyItems.map((item, index) => {
            return (
              <Draggable
                key={`buy-item-list-${item.id}`}
                draggableId={`buy-item-list-${item.id}`}
                index={index}
              >
                {(provided) => (
                  <ListItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        sx={{ paddingRight: "11px" }}
                      >
                        <CheckCircleIcon />
                      </IconButton>
                    }
                    sx={{ pl: 4 }}
                  >
                    <ListItemText primary={item.name} />
                  </ListItem>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </List>
      )}
    </Droppable>
  );
};

export default BuyItemList;
