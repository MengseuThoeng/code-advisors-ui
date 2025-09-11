import RandomLoadingSystem from '@/components/RandomLoadingSystem'

export default function HomeLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <RandomLoadingSystem size="lg" />
      </div>
    </div>
  )
}
