import { useState } from "react"
import Flex from "@shared/flex"
import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import { Search, SlidersHorizontal, Inbox } from "lucide-react"

const TABS = ["All", "Telegram", "Instagram", "WhatsApp"] as const
type Tab = (typeof TABS)[number]

const ConversationsPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("All")

  return (
    <div className="flex h-full w-full overflow-hidden -m-4" style={{ height: "calc(100vh - 4rem)" }}>
      {/* Left panel */}
      <div className="flex h-full w-80 shrink-0 flex-col border-r bg-background">
        <div className="border-b px-4 py-3">
          <p className="mb-3 text-base font-semibold">Inbox</p>

          {/* Search */}
          <div className="relative mb-3">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search conversations, messages..."
              className="h-8 pl-8 text-sm"
            />
          </div>

          {/* Tabs */}
          <Flex align="center" gap={1}>
            {TABS.map((tab) => (
              <Button
                key={tab}
                type="button"
                variant="ghost"
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </Button>
            ))}
          </Flex>
        </div>

        {/* Filters */}
        <div className="border-b px-4 py-2">
          <Flex align="center" gap={2}>
            <SlidersHorizontal size={15} className="shrink-0 text-muted-foreground" />
            <Select defaultValue="all">
              <SelectTrigger className="h-7 border-0 p-0 text-sm shadow-none focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-assignees">
              <SelectTrigger className="h-7 border-0 p-0 text-sm shadow-none focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-assignees">All assignees</SelectItem>
                <SelectItem value="me">Me</SelectItem>
                <SelectItem value="unassigned">Unassigned</SelectItem>
              </SelectContent>
            </Select>
          </Flex>
        </div>

        {/* Empty state */}
        <Flex direction="column" align="center" justify="center" gap={2} className="h-full">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted">
            <Inbox size={20} className="text-muted-foreground" />
          </div>
          <p className="text-sm font-semibold">No conversations</p>
          <p className="text-xs text-muted-foreground">Nothing matches the current filters.</p>
        </Flex>
      </div>

      {/* Middle panel */}
      <Flex direction="column" align="center" justify="center" gap={2} className="h-full flex-1 bg-background">
        <div className="flex size-14 items-center justify-center rounded-full bg-muted">
          <Inbox size={22} className="text-muted-foreground" />
        </div>
        <p className="text-base font-semibold">Your inbox is open</p>
        <p className="text-sm text-muted-foreground">Select a conversation from the left to start replying.</p>
      </Flex>

      {/* Right panel */}
      <div className="flex h-full w-52 shrink-0 items-start border-l bg-background px-4 py-4">
        <p className="text-sm text-muted-foreground">Select a conversation</p>
      </div>
    </div>
  )
}

export default ConversationsPage
