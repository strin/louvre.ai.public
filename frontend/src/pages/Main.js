import React, { useState } from "react";
import {
  ArwesThemeProvider,
  StylesBaseline,
  Text,
  Button,
  LoadingBars,
} from "@arwes/core";
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

const InputContainer = styled.div`
  position: relative;
  margin-top: 300px;
  margin-left: auto;
  margin-right: auto;
  max-width: 50vw;
  height: 50px;
  text-align: right;

  kbd {
    position: absolute;
    margin-top: 10px;
    margin-left: -50px;
  }
`;

const Input = styled.input`
  position: absolute;
  width: 100%;
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

const ProgressContainer = styled.div`
  margin-top: 25px;
  margin-left: auto;
  margin-right: auto;
  width: 200px;
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

  const [progressActivate, setProgressActivate] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setActivate(!progressActivate);
      if (!progressActivate) {
        setProgress(0);
      }
    }, 2000);
    return () => clearTimeout(timeout);
  }, [progressActivate]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (progress < 90) {
        setProgress(progress + 1);
      }
    }, 200);
    return () => clearTimeout(timeout);
  }, [progress]);

  const submit = async () => {
    if (progressActivate) {
      console.warn("There is another task in progress. Please wait");
      return;
    }
    console.log("query", query);

    setProgressActivate(true);
    setProgress(0);

    const result = await generate_photos(query);
    console.log("dalle result", result);

    const generations = result.generations.data;
    console.log("generations", generations);
    for (let it = 0; it < generations.length; it++) {
      const generation = generations[it].generation;
      set_pic_url(it, generation.image_path);
    }
    setProgressActivate(false);
  };

  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      submit();
    }
  };

  React.useEffect(() => {
    window.addEventListener("keypress", handleKeypress);

    return () => {
      window.removeEventListener("keypress", handleKeypress);
    };
  }, [submit]);

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

        <InputContainer>
          <kbd>Enter</kbd>
          <Input
            defaultValue={""}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </InputContainer>

        <ProgressContainer>
          {progressActivate && (
            <LoadingBars
              animator={{ progressActivate }}
              determinate
              progress={progress}
            />
          )}
        </ProgressContainer>

        <ButtonContainer>
          <Button onClick={submit}>Submit</Button>

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
