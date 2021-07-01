import React from "react";
import { View, Text } from "react-native";
import { InnerContainer, StyledContainer } from "../components/styles";

function About() {
  return (
    <StyledContainer>
      <InnerContainer>
        <Text style={{ textAlign: "justify" }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Text>
        
        <Text style={{ margin:5,fontWeight:'bold' }}>
            App Name: StoryLine
        </Text>
        <Text style={{ fontStyle:'italic' }}>
            App Version : 1.10
        </Text>
      </InnerContainer>
    </StyledContainer>
  );
}

export default About;
