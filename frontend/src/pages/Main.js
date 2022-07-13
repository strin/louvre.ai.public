import React, { useState } from "react";
import { ArwesThemeProvider, StylesBaseline, Text, Button } from "@arwes/core";
import { BleepsProvider, BleepsAudioSettings } from "@arwes/sounds";
import logo from "../logo.svg";
import { generate_photos } from "../imagen/dalle";
import styled from "styled-components";

import { get_pic_url, set_pic_url } from "../state";

const FONT_FAMILY_ROOT = '"Titillium Web", sans-serif';
const FONT_FAMILY_CODE = '"Source Code Pro", monospace';

const SOUND_CLICK_URL = "https://playground.arwes.dev/assets/sounds/type.mp3";
const audioSettings = {
  common: {
    volume: 0.5,
  },
};
const playersSettings = {
  type: {
    src: [SOUND_CLICK_URL],
  },
};
const bleepsSettings = {
  tap: {
    player: "type",
  },
};

const duration = { enter: 1000, exit: 1000 };

const Input = styled.input`
  margin-top: 300px;
  margin-left: auto;
  margin-right: auto;
  max-width: 50vw;
`;

const ButtonContainer = styled.div`
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;

  button {
    margin-left: 25px;
    margin-right: 25px;
  }
`;

// Theme with default settings.
const themeSettings = {};

function Main() {
  const [activate, setActivate] = React.useState(true);
  React.useEffect(() => {
    const timeout = setTimeout(() => setActivate(!activate), 2000);
    return () => clearTimeout(timeout);
  }, [activate]);

  const [query, setQuery] = useState("");

  return (
    <ArwesThemeProvider themeSettings={themeSettings}>
      <StylesBaseline
        styles={{
          "html, body": { fontFamily: FONT_FAMILY_ROOT },
          "code, pre": { fontFamily: FONT_FAMILY_CODE },
        }}
      />
      <BleepsProvider
        audioSettings={audioSettings}
        playersSettings={playersSettings}
        bleepsSettings={bleepsSettings}
      >
        {/*<Text animator={{ duration, activate }}>
          <p>This is Louvre in the age of AGI.</p>
          <p>This is Louvre in the age of AGI.</p>
          <p>This is Louvre in the age of AGI.</p>
          <p>This is Louvre in the age of AGI.</p>
        </Text>*/}

        <Input
          defaultValue={""}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <ButtonContainer>
          <Button
            onClick={async () => {
              const result = await generate_photos(query);
              console.log("dalle result", result);

              const generations = result.generations.data;
              console.log("generations", generations);
              for (let it = 0; it < generations.length; it++) {
                const generation = generations[it].generation;
                set_pic_url(it, generation.image_path);
              }
            }}
          >
            Submit
          </Button>
          <Button
            onClick={() => {
              setQuery("");
            }}
          >
            Clear
          </Button>
        </ButtonContainer>
      </BleepsProvider>
    </ArwesThemeProvider>
  );
}

export default Main;
