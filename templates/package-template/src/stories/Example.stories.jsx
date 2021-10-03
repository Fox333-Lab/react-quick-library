import React from "react";
import { Example } from "../components/Example";

export default {
  title: "Demo/Example",
  component: Example,
  argTypes: {
    text: { description: "Text of the component" },
    bgColor: {
      description: "Background color of the component",
    },
  },
  // parameters: {
  //   docs: {
  //     page: null,
  //   },
  // },
};

const Template = (args) => <Example {...args} />;

export const ExampleComp = Template.bind({});

ExampleComp.args = {
  text: "Hello World! I am a component",
};
