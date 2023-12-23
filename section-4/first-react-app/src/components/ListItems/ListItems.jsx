import ListItem from "./ListItem";
import ListItem2 from "./ListItem2";
import ListItem3 from "./ListItem3";
import ListItem4 from "./ListItem4";
import reactLogo from "../../assets/react.svg";
import { listData } from "../../data";
import Section from "../Section/Section";

export default function ListItems() {
  return (
    //     <section id='list-items'>
    //         <h2>List Items without Map</h2>
    //         <ul>
    //         <ListItem image={reactLogo} title="Title 1" subtitle="Subtitle 1" hobbies={['Badminton', 'Swimming', 'Gym']} address={{ state: "Penang", country: "Malaysia"}} />
    //         {/* <ListItem image={viteLogo} title="Title 2" subtitle="Subtitle 2" hobbies={['Badminton', 'Swimming', 'Gym', 'lalala']} address={{ state: "Kedah", country: "Malaysia"}} /> */}

    //         {/* with company provided */}
    //         <ListItem2 {...listData[1]} company={"Intel IDK"} address={{state: "test state1", country: "test country1"}}/>

    //         {/* no company provided, default value is used */}
    //         <ListItem2 {...listData[1]}/>

    //         <ListItem address={{ state: "State 3", country: "Country 3"}}/>

    //         {/* <ListItem /> wont work because address is null so cant access state/country */}

    //         <ListItem image={listData[2].image} title={listData[2].title} subtitle={listData[2].subtitle} hobbies={listData[2].hobbies} address={listData[2].address} job={listData[2].job}></ListItem>

    //         {/* props key must be the same as the listData object keys to use this shortcut (e.g. listData[3].img wont be mapped to props.image) */}
    //         <ListItem {...listData[3]}></ListItem>

    //         <ListItem3 info={listData[4]} />

    //         <ListItem4 title={listData[5].title} address={listData[5].address} />
    //         </ul>
    //   </section>

    <Section title="List Items without Map" id="list-items">
      <ul>
        <ListItem
          image={reactLogo}
          title="Title 1"
          subtitle="Subtitle 1"
          hobbies={["Badminton", "Swimming", "Gym"]}
          address={{ state: "Penang", country: "Malaysia" }}
        />
        {/* <ListItem image={viteLogo} title="Title 2" subtitle="Subtitle 2" hobbies={['Badminton', 'Swimming', 'Gym', 'lalala']} address={{ state: "Kedah", country: "Malaysia"}} /> */}

        {/* with company provided */}
        <ListItem2
          {...listData[1]}
          company={"Intel IDK"}
          address={{ state: "test state1", country: "test country1" }}
        />

        {/* no company provided, default value is used */}
        <ListItem2 {...listData[1]} />

        <ListItem address={{ state: "State 3", country: "Country 3" }} />

        {/* <ListItem /> wont work because address is null so cant access state/country */}

        <ListItem
          image={listData[2].image}
          title={listData[2].title}
          subtitle={listData[2].subtitle}
          hobbies={listData[2].hobbies}
          address={listData[2].address}
          job={listData[2].job}
        ></ListItem>

        {/* props key must be the same as the listData object keys to use this shortcut (e.g. listData[3].img wont be mapped to props.image) */}
        <ListItem {...listData[3]}></ListItem>

        <ListItem3 info={listData[4]} />

        <ListItem4 title={listData[5].title} address={listData[5].address} />
      </ul>
    </Section>
  );
}
