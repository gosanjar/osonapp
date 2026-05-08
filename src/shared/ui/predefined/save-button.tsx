import { Button, type ButtonProps } from "../button"

const SaveButton = ({ children = "Saqlash", ...props }: ButtonProps) => (
  <Button size="lg" {...props}>
    {children}
  </Button>
)

export default SaveButton
