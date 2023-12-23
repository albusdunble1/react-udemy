// export default function Tabs({tabButtons, topicTitle1, children}) {
//     return (
//         <>
//             <menu>{tabButtons}</menu>
//             {topicTitle1}
//             {children}
//         </>
//     )
// }


// METHOD 1
// export default function Tabs({tabButtons, topicTitle1, buttonsContainer, children}) {
//     // map it to a uppercase string so that React knows that it's a custom component
//     // if it's lowercase it will treat buttonsContainer like other native elements such as div, body, ul, etc
//     const ButtonsContainer = buttonsContainer;

//     return (
//         <>
//             <ButtonsContainer>{tabButtons}</ButtonsContainer>
//             {topicTitle1}
//             {children}
//         </>
//     )
// }

// METHOD 2
// Make the prop uppercase from the get go, so theres no need to map it to an uppercase variable
export default function Tabs({tabButtons, topicTitle1, ButtonsContainer = "div", children}) {
    return (
        <>
            <ButtonsContainer>{tabButtons}</ButtonsContainer>
            {topicTitle1}
            {children}
        </>
    )
}


