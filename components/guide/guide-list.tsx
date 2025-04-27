'use client'

import { SupabaseGuide } from "@/lib/schemas/guides"
import { getUsersGuides } from "@/lib/supabase/guides"
import { Database } from "@/lib/supabase/types/database.types"
import { FC, useEffect, useState } from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"

interface GuideListProps {
  activeGuideID: string | null
  selectGuide: (id: string) => void
}

export const GuideList: FC<GuideListProps> = ({ activeGuideID, selectGuide }) => {
  const [guides, setGuides] = useState<Database["public"]["Tables"]["guides"]["Row"][]>([])

  useEffect(() => {
    async function fetchGuides() {
      const res = await getUsersGuides()
      console.log("fetchGuide res: ", res)
      if (res != null)
        setGuides(res)
      else
        console.log("No guides found?..")
    }

    fetchGuides()
  }, [])

  const [selectedGuideID, setSelectedGuide] = useState(activeGuideID)

  const handleGuideSelect = (id: string) => {
    console.log("Selecting guide: ", id)
    setSelectedGuide(id)
  }

  return (
    <Dialog>
      <DialogTrigger>
        Change Guide
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Guide</DialogTitle>
          <DialogDescription>

          </DialogDescription>
        </DialogHeader>
        <div className="h-40 overflow-y-scroll">
          <div className="flex flex-col gap-2">
            {guides.map((guide) => (
              <Button key={guide.id} onClick={() => handleGuideSelect(guide.id)}>
                <h2>
                  {guide.title}
                </h2>
              </Button>
            ))}
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={() => selectedGuideID != null && selectGuide(selectedGuideID)}>
              Select
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}