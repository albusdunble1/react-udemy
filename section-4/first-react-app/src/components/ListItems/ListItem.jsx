export default function ListItem (props){
    return (
      <li>
        <img src={props.image} alt={props.title} />
        <h1>{props.title}</h1>
        <h3>{props.subtitle}</h3>
        <p>{props.hobbies}</p>
        <p>{props.address.state}</p>
        <p>{props.address.country}</p>
        <p>{props.job}</p>
      </li>
    )
  }
  
  