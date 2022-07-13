import React from "react";
import { ArwesThemeProvider, StylesBaseline, Text, Button } from "@arwes/core";
import { BleepsProvider, BleepsAudioSettings } from "@arwes/sounds";
import logo from "../logo.svg";
import { generate_photos } from "../imagen/dalle";

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

// Theme with default settings.
const themeSettings = {};

function Main() {
  const [activate, setActivate] = React.useState(true);
  React.useEffect(() => {
    const timeout = setTimeout(() => setActivate(!activate), 2000);
    return () => clearTimeout(timeout);
  }, [activate]);

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
        <Text animator={{ duration, activate }}>
          <p>This is Louvre in the age of AGI.</p>
          <p>This is Louvre in the age of AGI.</p>
          <p>This is Louvre in the age of AGI.</p>
          <p>This is Louvre in the age of AGI.</p>
        </Text>

        <input />
        <Button
          onClick={async () => {
            const result = await generate_photos(
              "There are creatures here that I've never seen before"
            );
            console.log("dalle result", result);

            const generations = result.generations.data;
            console.log("generations", generations);
            for (let it = 0; it < generations.length; it++) {
              const generation = generations[it].generation;
              localStorage.setItem("museum-pic-" + it, generation.image_path);
            }
          }}
        >
          Submit
        </Button>
        <Button>Clear</Button>
      </BleepsProvider>
    </ArwesThemeProvider>
  );
}

export default Main;
