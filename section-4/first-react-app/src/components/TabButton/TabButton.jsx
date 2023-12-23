import "./TabButton.css";

// export default function TabButton(props){
//     // function handleClick(){
//     //     console.log(props.children);
//     // }
//     return (
//         <li>
//             {/* <button onClick={handleClick}>{props.children}</button> */}
//             <button className={props.isSelected? 'active': undefined} onClick={props.onSelect}>{props.children}</button>
//         </li>
//     )
// }

export default function TabButton({ isSelected, children, ...props }) {
  return (
    <li>
      <button className={isSelected ? "active" : undefined} {...props}>
        {children}
      </button>
    </li>
  );
}
