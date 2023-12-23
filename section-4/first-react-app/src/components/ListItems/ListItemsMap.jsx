import { listData } from '../../data'
import ListItem2 from './ListItem2'
import Section from '../Section/Section'

export default function ListItemsMap() {
    return (
    //     <section id='list-items-using-map'>
    //         <h2>List Items with Map</h2>
    //         <ul>
    //         {listData.map(x => {
    //             return (
    //             // key is needed by react to optimize the rendering of lists
    //             <ListItem2 key={x.title} {...x}></ListItem2>
    //             )
    //         })}
    //         </ul>
    //   </section>

      <Section title="List Items with Map" id="list-items-using-map">
        <ul>
            {listData.map(x => {
                return (
                // key is needed by react to optimize the rendering of lists
                <ListItem2 key={x.title} {...x}></ListItem2>
                )
            })}
        </ul>
      </Section>
    )
}