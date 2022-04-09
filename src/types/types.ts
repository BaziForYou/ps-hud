import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'

export const iconNames = ["voice", "health", "armor", "hunger", "thirst", "stress",
  "oxygen", "armed", "parachute", "engine", "harness", "cruise", "nos", "dev"] as const;
export type iconNamesKind = typeof iconNames[number];

export type playerHudIcons = {
  [key in iconNamesKind]: optionalHudIconType;
}

export const iconLayouts = ["standard", "bottom-right-row", "center-bottom-row",
"left-bottom-column", "right-bottom-column", "top-left-row" ] as const;
export type layoutIconKind = typeof iconLayouts[number];

export const layoutPresets = ["esx-hud-hard-to-let-go"]
export type layoutPresetKind = typeof layoutPresets[number];

export const shapes = [
  "badge", "circle-ring", "circle-circle-fill", "circle-square-fill", "circle-whole", //"cylinder",
  "diamond-ring", "diamond-whole", "hexagon-ring", "hexagon-whole", "horizontal-bar",
  "icon-percentage", "pill-ring", "pill-whole",
  "square-circular-fill", "square-ring", "square-whole", "star-ring", "triangle-ring", 
  "vertical-bar",
] as const;
export type shapekind = typeof shapes[number];

export interface baseIconInfo {
  defaultColor: string,
  isShowing: boolean,
  name: string,
  shape: shapekind,
}

export interface baseIconProps extends baseIconInfo {
  height: number,
  icon: IconDefinition,
  iconColor: string,
  iconScaling: number,
  iconTranslateX: number,
  iconTranslateY: number,
  innerColor: string,
  innerColorOpacity: number,
  progressColor: string,
  progressValue: number,
  rotateDegree: number,
  translateX: number,
  translateY: number,
  width: number
}

export interface borderIconProps extends baseIconProps {
  borderColor: string,
  borderSize: number,
}

export interface ringIconProps extends baseIconProps {
  iconRotateDegree: number,
  outlineColor: string,
  outlineColorOpacity: number,
  ringSize: number,
}

export interface roundEndIconProps extends baseIconProps {
  xAxisRound: number,
  yAxisRound: number 
}

export interface textIcon extends baseIconProps {
  conditionalText: (val: number) => string,
}

export class baseIcon implements baseIconProps {
  defaultColor = "orange";
  height = 50;
  icon = null;
  iconColor = "orange";
  iconScaling = 0.40;
  iconTranslateX = 0;
  iconTranslateY = 0;
  innerColor = "#212121";
  innerColorOpacity = 1;
  isShowing = true;
  name = "";
  progressColor = "";
  progressValue = 100;
  shape: shapekind = "circle-whole";
  rotateDegree = 0;
  translateX = 0;
  translateY = 0;
  width = 50;

  // { defaultColor: string; icon: IconDefinition; iconColor: string, isShowing: boolean, innerColor: string, progressColor: string }) {

  constructor(shape: shapekind,
    { defaultColor="", icon=null, iconColor="", isShowing=false, innerColor="orange", progressColor="orange", name="" }={}) {

    switch (shape) {
      case "circle-circle-fill":
      case "circle-square-fill":
      case "circle-whole":        
        this.iconScaling = 0.55;
        break;
      case "diamond-whole":
        this.height = 60;
        this.width = 60;
        this.iconScaling = 0.35;
        break;
      case "hexagon-whole":
        this.iconScaling = 0.45;
        break;
      case "horizontal-bar":
        this.iconScaling = 0.60;
        break;
    }
    this.shape = shape;
    this.defaultColor = defaultColor;
    this.icon = icon;
    this.iconColor = iconColor;
    this.isShowing = isShowing;
    this.innerColor = innerColor;
    this.progressColor = progressColor;
    this.name = name;
  }
}

export class ringIcon extends baseIcon implements ringIconProps {
  iconRotateDegree = 0;
  outlineColor = "";
  outlineColorOpacity = 0.4;
  ringSize = 4;

  constructor(shape: shapekind, optionalProps=null) {
    super(shape, optionalProps);
    switch (shape) {
      case "circle-ring":
        this.iconScaling = 0.4;
        this.ringSize = 5;
        break;
      case "diamond-ring":
        this.height = 60;
        this.width = 60;
        this.iconScaling = 0.3;
        this.ringSize = 1.5;
        break;
      case "hexagon-ring":
        this.iconScaling = 0.4;
        this.ringSize = 2;
        break;
      case "square-ring":
        this.ringSize = 12;
        break;
      case "star-ring":
        this.height = 55;
        this.width = 55;
        this.ringSize = 3;
        this.iconScaling = 0.35;
        this.iconTranslateY = 0.06;
        break;
      case "triangle-ring":
        this.height = 55;
        this.width = 55;
        this.iconScaling = 0.3;
        this.iconTranslateY = 0.09;
        this.ringSize = 3;
        break;
    }
  }
}

export class roundEndIcon extends baseIcon implements roundEndIconProps {
  xAxisRound = 5;
  yAxisRound = 20;

  constructor(shape: shapekind, optionalProps={}) {
    super(shape, optionalProps);
    switch (shape) {
      case "badge":
        this.height = 4;
        this.width = 35;
        this.iconScaling = 1.4;
        this.xAxisRound = 5;
        this.yAxisRound = 20;
        break;
      case "pill-whole":
        this.height = 75;
        this.width = 50;
        this.iconScaling = 0.55;
        this.xAxisRound = 18;
        this.yAxisRound = 18;
        break;
    }
  }
}

export class pillRingIcon extends ringIcon implements roundEndIconProps {
  xAxisRound = 5;
  yAxisRound = 20;
  constructor(shape: shapekind, optionalProps={}) {
    super(shape, optionalProps);
    switch (shape) {
      case "pill-ring":
        this.height = 80;
        this.width = 50;
        this.iconScaling = 0.40;
        this.xAxisRound = 18;
        this.yAxisRound = 18;
        this.ringSize = 6.5;
    }
  }
}

export function createShapeIcon(shape: shapekind, optionalProps={}): optionalHudIconType {
  switch (shape) {
    case "badge":
    case "pill-whole":
      return new roundEndIcon(shape, optionalProps);
    case "circle-circle-fill":
    case "circle-square-fill":
    case "circle-whole":
    case "diamond-whole":
    case "hexagon-whole":
    case "horizontal-bar":
    case "square-circular-fill":
      return new baseIcon(shape, optionalProps);
    case "circle-ring":
    case "diamond-ring":
    case "hexagon-ring":
    case "square-ring":
    case "star-ring":
    case "triangle-ring":
    case "square-whole":
      return new ringIcon(shape, optionalProps);
    case "pill-ring":
      return new pillRingIcon(shape, optionalProps);
    default:
      return new baseIcon(shape, optionalProps);
  }
}

export interface shapeIcons {
  "horizontal-bar": textIcon,
  "icon-percentage": baseIconProps,
}

export type optionalHudIconType = Partial<baseIconProps & borderIconProps & ringIconProps & roundEndIcon & pillRingIcon>;

export type optionalPlayerHudIconsType = Partial<{ [Property in keyof playerHudIcons]: optionalHudIconType }>;

export function defaultHudIcon(name = "", showing=false, color="red", icon=null): any {
  return createShapeIcon("circle-ring",
    { defaultColor: color, iconColor: color, isShowing: showing, icon: icon,
      innerColor: "#212121", progressColor: color, name: name
    });
}

export type shapePropsType =  Omit<optionalHudIconType, "shape" | "isShowing" | "name" | "defaultColor" >;

export function defaultShapeProps(): shapePropsType {
  return (({ shape, isShowing, name, ...o }) => o)(defaultHudIcon());
}