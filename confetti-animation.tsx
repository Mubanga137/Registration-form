"use client"

import { useEffect, useState } from "react"

interface ConfettiPiece {
  id: number
  x: number
  y: number
  rotation: number
  color: string
  size: number
  velocityX: number
  velocityY: number
  rotationSpeed: number
}

export function Confetti() {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])
  const [isActive, setIsActive] = useState(true)

  const colors = [
    "#10B981", // emerald-500
    "#06B6D4", // cyan-500
    "#3B82F6", // blue-500
    "#8B5CF6", // violet-500
    "#F59E0B", // amber-500
    "#EF4444", // red-500
    "#EC4899", // pink-500
  ]

  useEffect(() => {
    // Create initial confetti pieces
    const pieces: ConfettiPiece[] = []
    for (let i = 0; i < 50; i++) {
      pieces.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -10,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        velocityX: (Math.random() - 0.5) * 4,
        velocityY: Math.random() * 3 + 2,
        rotationSpeed: (Math.random() - 0.5) * 10,
      })
    }
    setConfetti(pieces)

    // Animation loop
    const animate = () => {
      setConfetti((prev) =>
        prev
          .map((piece) => ({
            ...piece,
            x: piece.x + piece.velocityX,
            y: piece.y + piece.velocityY,
            rotation: piece.rotation + piece.rotationSpeed,
            velocityY: piece.velocityY + 0.1, // gravity
          }))
          .filter((piece) => piece.y < window.innerHeight + 10),
      )
    }

    const interval = setInterval(animate, 16) // ~60fps

    // Stop after 4 seconds
    const timeout = setTimeout(() => {
      setIsActive(false)
      clearInterval(interval)
    }, 4000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  if (!isActive && confetti.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute transition-opacity duration-1000"
          style={{
            left: piece.x,
            top: piece.y,
            transform: `rotate(${piece.rotation}deg)`,
            opacity: isActive ? 1 : Math.max(0, 1 - piece.y / window.innerHeight),
          }}
        >
          {/* Square confetti */}
          <div
            className="rounded-sm shadow-sm"
            style={{
              width: piece.size,
              height: piece.size,
              backgroundColor: piece.color,
            }}
          />
        </div>
      ))}
    </div>
  )
}
