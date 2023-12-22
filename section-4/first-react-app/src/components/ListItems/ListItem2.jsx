// object destructuring way to only extract relevant keys from the props (e.g. job is not used so it can be excluded), so that less code is written
export default function ListItem2 ({image, title, subtitle, hobbies, address= {state: "DEFAULT STATE", country: "DEFAULT COUNTRY"}, company= "Default Company"}){
    return (
      <li>
        <img src={image} alt={title} />
        <h1>{title}</h1>
        <h3>{subtitle}</h3>
        <p>{hobbies}</p>
        <p>{address.state}</p>
        <p>{address.country}</p>
        <p>{company}</p>
      </li>
    )
  }
  
  