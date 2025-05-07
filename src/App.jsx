import { Button } from "./components/ui/button";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
          🎉 Tailwind + shadcn/ui Test 🎉
        </h1>
        <p className="text-center text-gray-600 mb-8">
          If you see styled buttons below, shadcn/ui and Tailwind are working!
        </p>
        <div className="flex flex-col gap-4">
          <Button>Default Button</Button>
          <Button variant="destructive">Destructive Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button size="sm">Small Button</Button>
          <Button size="default">Default Size</Button>
          <Button size="lg">Large Button</Button>
        </div>
      </div>
    </div>
  );
}
