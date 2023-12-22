import './TabButton.css'

export default function TabButton(props){
    // function handleClick(){
    //     console.log(props.children);
    // }
    return (
        <li>
            {/* <button onClick={handleClick}>{props.children}</button> */}
            <button className={props.isSelected? 'active': undefined} onClick={props.onSelect}>{props.children}</button>
        </li>
    )
}