import { useRef } from "react";

interface TripleClickProps {
  onTripleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  delay?: number; // Maximum time (ms) between clicks to count as a triple click.
}

interface useMulticlickProps {
  onDoubleClick?: () => void
  onTripleClick?: () => void
  delay?: number
}

export function useMulticlick({ onDoubleClick, onTripleClick, delay = 300 }: useMulticlickProps) {

  const clickCountRef = useRef(0)
  const timerRef = useRef<number | null>(null)

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {

    clickCountRef.current = Math.min(clickCountRef.current + 1, 3)

    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = window.setTimeout(() => {
      switch (clickCountRef.current) {
        case 3:
          if (onTripleClick != undefined)
            onTripleClick()
          clickCountRef.current = 0
          break
        case 2:
          if (onDoubleClick != undefined)
            onDoubleClick()
          break
      }
      clickCountRef.current = Math.max(clickCountRef.current - 1, 0)
    }, delay)
  }


  return { handleClick }
}