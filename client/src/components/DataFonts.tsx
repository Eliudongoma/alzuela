import {Text, TextProps } from "@chakra-ui/react"
import { fontFamily } from "../data/Fonts"

const DataFont = ({ children, ...otherProps }: TextProps) => {
  <Text {...otherProps} fontFamily={fontFamily}>
    {children}
  </Text>
}

export default DataFont
