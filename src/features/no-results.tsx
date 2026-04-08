import { Card, CardContent } from "@/shared/ui/card"
import Flex from "@/shared/ui/flex"

const NoResults = ({ title, content }: { title: string; content: string }) => {
  return (
    <Card className="w-full">
      <CardContent>
        <Flex direction="column" align="center" className="w-full">
          <img src="/illustrations/26.svg" alt="" className="h-50" />
          <span className="text-lg font-semibold">{title}</span>
          <span className="font-light">{content}</span>
        </Flex>
      </CardContent>
    </Card>
  )
}

export default NoResults
