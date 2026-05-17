import Card from "@shared/card"
import Flex from "@shared/flex"

const NoResults = ({
  title = "No Results.",
  content,
}: {
  title?: string
  content?: string
}) => {
  return (
    <Card>
      <Flex direction="column" align="center">
        <img src="/illustrations/26.svg" alt="" className="h-50" />
        <span className="text-lg font-semibold">{title}</span>
        <span className="font-light">{content ?? ""}</span>
      </Flex>
    </Card>
  )
}

export default NoResults
