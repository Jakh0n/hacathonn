import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

type Socket = ReturnType<typeof io>

export const useSocket = (): Socket | null => {
	const [socket, setSocket] = useState<Socket | null>(null)

	useEffect(() => {
		const newSocket = io(
			process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'http://localhost:3001',
			{
				withCredentials: true,
				transports: ['websocket', 'polling'],
			}
		)
		setSocket(newSocket)
		return () => {
			newSocket.disconnect()
		}
	}, [])

	return socket
}
