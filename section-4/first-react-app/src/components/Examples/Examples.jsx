import { useState } from "react";
import { EXAMPLES } from "../../data";
import TabButton from "../TabButton/TabButton";
import Section from "../Section/Section";
import Tabs from "../Tabs/Tabs";

export default function Examples() {
  let [selectedTopic, setSelectedTopic] = useState();

  function handleSelect(event, buttonName) {
    console.log(buttonName + " " + "SELECTED!");
    setSelectedTopic(buttonName);
  }

  let topicTitle1 = null;

  if (selectedTopic) {
    topicTitle1 = <h2>{selectedTopic}</h2>;
    console.log("HELLO");
    console.log(topicTitle1);
  }

  return (
    // <section id="examples">
    //   <h2>Examples</h2>
    //   <menu>
    //     <TabButton
    //       isSelected={selectedTopic == "Components"}
    //       onSelect={(event) => handleSelect(event, "Components")}
    //     >
    //       <i>Components</i>
    //     </TabButton>
    //     <TabButton
    //       isSelected={selectedTopic == "JSX"}
    //       onSelect={(event) => handleSelect(event, "JSX")}
    //     >
    //       <i>JSX</i>
    //     </TabButton>
    //     <TabButton
    //       isSelected={selectedTopic == "Props"}
    //       onSelect={(event) => handleSelect(event, "Props")}
    //     >
    //       <i>Props</i>
    //     </TabButton>
    //     <TabButton
    //       isSelected={selectedTopic == "State"}
    //       onSelect={(event) => handleSelect(event, "State")}
    //     >
    //       State
    //     </TabButton>
    //   </menu>

    //   {/* alternative to ternary operator if you dont have else */}
    //   {/* {selectedTopic && <h2>{selectedTopic}</h2>} */}

    //   {topicTitle1}

    //   {selectedTopic ? (
    //     <div id="tab-content">
    //       <h3>{EXAMPLES[selectedTopic.toLowerCase()].title}</h3>
    //       <p>{EXAMPLES[selectedTopic.toLowerCase()].description}</p>
    //       <pre>
    //         <code>{EXAMPLES[selectedTopic.toLowerCase()].code}</code>
    //       </pre>
    //     </div>
    //   ) : (
    //     <h3>Please select a topic!</h3>
    //   )}
    // </section>

    // <Section title="Examples" id="examples">
    //   <menu>
    //     <TabButton
    //       isSelected={selectedTopic == "Components"}
    //       onClick={(event) => handleSelect(event, "Components")}
    //     >
    //       <i>Components</i>
    //     </TabButton>
    //     <TabButton
    //       isSelected={selectedTopic == "JSX"}
    //       onClick={(event) => handleSelect(event, "JSX")}
    //     >
    //       <i>JSX</i>
    //     </TabButton>
    //     <TabButton
    //       isSelected={selectedTopic == "Props"}
    //       onClick={(event) => handleSelect(event, "Props")}
    //     >
    //       <i>Props</i>
    //     </TabButton>
    //     <TabButton
    //       isSelected={selectedTopic == "State"}
    //       onClick={(event) => handleSelect(event, "State")}
    //     >
    //       State
    //     </TabButton>
    //   </menu>

    //   {/* alternative to ternary operator if you dont have else */}
    //   {/* {selectedTopic && <h2>{selectedTopic}</h2>} */}

    //   {topicTitle1}

    //   {selectedTopic ? (
    //     <div id="tab-content">
    //       <h3>{EXAMPLES[selectedTopic.toLowerCase()].title}</h3>
    //       <p>{EXAMPLES[selectedTopic.toLowerCase()].description}</p>
    //       <pre>
    //         <code>{EXAMPLES[selectedTopic.toLowerCase()].code}</code>
    //       </pre>
    //     </div>
    //   ) : (
    //     <h3>Please select a topic!</h3>
    //   )}
    // </Section>

    <Section title="Examples" id="examples">
      <Tabs
        // you can pass existing custom components as a container as well, but it's Section instead of <Section />
        // buttonsContainer={Section} 

        ButtonsContainer="menu"
        tabButtons={
          <>
            <TabButton
              isSelected={selectedTopic == "Components"}
              onClick={(event) => handleSelect(event, "Components")}
            >
              <i>Components</i>
            </TabButton>
            <TabButton
              isSelected={selectedTopic == "JSX"}
              onClick={(event) => handleSelect(event, "JSX")}
            >
              <i>JSX</i>
            </TabButton>
            <TabButton
              isSelected={selectedTopic == "Props"}
              onClick={(event) => handleSelect(event, "Props")}
            >
              <i>Props</i>
            </TabButton>
            <TabButton
              isSelected={selectedTopic == "State"}
              onClick={(event) => handleSelect(event, "State")}
            >
              State
            </TabButton>
          </>
        }
        topicTitle1
      >
        {selectedTopic ? (
          <div id="tab-content">
            <h3>{EXAMPLES[selectedTopic.toLowerCase()].title}</h3>
            <p>{EXAMPLES[selectedTopic.toLowerCase()].description}</p>
            <pre>
              <code>{EXAMPLES[selectedTopic.toLowerCase()].code}</code>
            </pre>
          </div>
        ) : (
          <>
            <h3>Please select a topic!</h3>
            <p>test</p>
          </>
        )}
      </Tabs>
    </Section>
  );
}
