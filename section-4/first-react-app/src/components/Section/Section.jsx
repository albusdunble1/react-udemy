// export default function Section(props) {
//     return (
//         <section id={props.id}>
//             <h2>{props.title}</h2>
//             {props.children}
//         </section>
//     )
// }

// to make forward other props such as id, class, etc, easier than the example commented out above
export default function Section({title, children, ...props}) {
    return (
        <section {...props}>
            <h2>{title}</h2>
            {children}
        </section>
    )
}