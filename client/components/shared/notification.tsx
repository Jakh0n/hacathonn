import { Card, CardContent } from '@/components/ui/card'

interface NotificationProps {
	message: string
}

export default function Notification({ message }: NotificationProps) {
	return (
		<Card className='bg-blue-500 text-white animate-fade-in shadow-lg'>
			<CardContent className='p-3'>{message}</CardContent>
		</Card>
	)
}
