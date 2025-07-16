import React from "react";
import { ListItem, ListItemText, IconButton, Divider, Typography, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import theme from "../../Styles/theme";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear() % 100}`;
};


const SingleRecord = ({
  record,
  id,
  amount,
  date,
  description,
  onEdit,
  onDelete,
  isDark,
  showDivider = true,
}) => (
  
  <>
    <ListItem
      secondaryAction={
        <Box>
          <IconButton edge="end" aria-label="edit" onClick={()=>onEdit(record)} color="info">
            <EditIcon />
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={onDelete}  color="error">
            <DeleteIcon    />
          </IconButton>
        </Box>
      }
    >
      <ListItemText
        primary={"₪ " + amount.toLocaleString()}
        secondary={
          <>
            <Typography variant="body2" sx={{ color: theme.colors.text }}>
              Date: {formatDate(date)}
            </Typography>
             <Typography variant="body2" sx={{ color: theme.colors.text }}>
              ID: {id}
            </Typography>
            {description && (
              <Typography variant="body2" sx={{ color:  theme.colors.text }}>
                Note: {description}
              </Typography>
            )}
          </>
        }
        primaryTypographyProps={{
          color: isDark ? "#080303" : "text.primary",
          fontWeight: "bold",
        }}
      />
    </ListItem>
    {showDivider && <Divider />}
  </>
);

export default SingleRecord;
