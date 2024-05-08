// import {
//     List,
//     ListItem,
//     ListItemText,
//     ListItemIcon,
//     IconButton,
// } from "@mui/material";
// import {
//     Delete as DeleteIcon,
//     Edit as EditIcon,
// } from "@mui/icons-material";

// export default function CategoryList({ category }) {
//     return (
//         <List>
//             {category.map(item => {
//                 return (
//                     <ListItem
//                         // key={item.id}
//                         secondaryAction={
//                             <>
//                                 <IconButton>
//                                     <EditIcon color="info" />
//                                 </IconButton>
//                                 <IconButton>
//                                     <DeleteIcon color="danger" />
//                                 </IconButton>
//                             </>
//                         }
//                     >
//                         <ListItemText primary={item.name} />
//                     </ListItem>
//                 );
//             })}
//         </List>
//     )
// }