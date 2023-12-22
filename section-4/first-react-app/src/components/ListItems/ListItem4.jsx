// another way of passing props, group all keys into 1 big prop
// then you could either just the info object as is, or destructure it
export default function ListItem4 ({...info}){
    const {title, subtitle, address} = info;
  
    return (
      <li>
        <img src={info.image} alt={title} />
        <h1>{title}</h1>
        <h3>{subtitle}</h3>
        <p>{info.hobbies}</p>
        <p>{address.state}</p>
        <p>{address.country}</p>
        <p>{info.job}</p>
      </li>
    )
  }