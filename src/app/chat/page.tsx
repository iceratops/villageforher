import type { Metadata } from 'next';
import { MessageCircleHeart, Heart, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Healing Companion - Village For Her',
  description: 'Connect with our AI-powered healing companion for guidance and emotional support',
  openGraph: {
    title: 'Healing Companion - Village For Her',
    description: 'Connect with our AI-powered healing companion for guidance and emotional support',
    type: 'website',
  },
};

export default function ChatPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <MessageCircleHeart className="h-10 w-10 text-pink-600" />
        </div>
        <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">
          Your Healing Companion
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Connect with our AI-powered companion for guidance, reflection, and emotional support on
          your healing journey.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl font-heading font-semibold text-gray-900 mb-6">
            What You Can Expect
          </h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="h-4 w-4 text-pink-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Emotional Support</h3>
                <p className="text-gray-600">
                  A safe space to express your feelings and receive compassionate responses.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-4 w-4 text-pink-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Personalized Guidance</h3>
                <p className="text-gray-600">
                  Tailored insights and suggestions based on your unique situation and needs.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircleHeart className="h-4 w-4 text-pink-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Reflection Tools</h3>
                <p className="text-gray-600">
                  Thought-provoking questions and exercises to deepen your self-awareness.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-warm-blush rounded-lg p-8">
          <h2 className="text-2xl font-heading font-semibold text-gray-900 mb-6">
            Ready to Begin?
          </h2>
          <p className="text-gray-600 mb-8">
            Start your healing journey with our AI companion. This is a safe, judgment-free space
            where you can explore your thoughts and feelings.
          </p>
          <div className="text-center">
            <button
              type="button"
              className="bg-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-600 transition-colors duration-200"
            >
              Begin Your Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
