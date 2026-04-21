import { MDXEditor, markdownShortcutPlugin } from "@mdxeditor/editor"
import "@mdxeditor/editor/style.css"

import {
  toolbarPlugin,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  linkPlugin,
  imagePlugin,
  tablePlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  ListsToggle,
  BlockTypeSelect,
  CreateLink,
  InsertImage,
  InsertTable,
  CodeToggle,
  InsertThematicBreak,
} from "@mdxeditor/editor"

export default function Editor() {
  return (
    <div className="relative h-65 w-full overflow-hidden rounded-sm border">
      <MDXEditor
        className="h-full w-full"
        markdown=""
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          linkPlugin(),
          imagePlugin(),
          tablePlugin(),
          markdownShortcutPlugin(),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <CodeToggle />
                <BlockTypeSelect />
                <ListsToggle />
                <CreateLink />
                <InsertImage />
                <InsertTable />
                <InsertThematicBreak />
              </>
            ),
          }),
        ]}
        onChange={(md) => {
          console.log(md)
        }}
      />
    </div>
  )
}
