"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"

// 👇 Lazy load TinyMCE để tránh SSR hydration lỗi
const Editor = dynamic(() => import("@tinymce/tinymce-react").then(m => m.Editor), {
  ssr: false,
})

export default function TextEditor({ content, setContent }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <p>Đang tải trình soạn thảo...</p>

  return (
    <div>
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
        value={content}
        onEditorChange={(newValue) => setContent(newValue)}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist", "autolink", "lists", "link", "image", "charmap", "preview",
            "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
            "insertdatetime", "media", "table", "help", "wordcount"
          ],
          toolbar:
            "undo redo | blocks | bold italic underline forecolor | " +
            "alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | image media link | code fullscreen | help",
          content_style: `
            body {
              font-family:Inter, sans-serif;
              font-size:14px;
              color:#333;
            }
          `,
          branding: false,
        }}
      />
    </div>
  )
}