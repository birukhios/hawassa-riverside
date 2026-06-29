import {
  Users,
  Building2,
  BookOpen,
  AlertCircle,
  Sparkles,
  Leaf,
} from "lucide-react";

const IMPACTS = [
  {
    title: "Community Support",
    description:
      "Supporting local communities and grassroots initiatives that create real impact",
    icon: Users,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Public Space Improvement",
    description:
      "Improving public spaces and infrastructure that benefit everyone",
    icon: Building2,
    color: "from-cyan-500 to-blue-600",
  },
  {
    title: "Youth & Education",
    description:
      "Empowering young people through education and skill development programs",
    icon: BookOpen,
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "Emergency Assistance",
    description:
      "Rapid response to community needs during crises and emergencies",
    icon: AlertCircle,
    color: "from-orange-500 to-red-600",
  },
  {
    title: "City Beautification",
    description:
      "Making Hawassa a more beautiful and welcoming place for all residents",
    icon: Sparkles,
    color: "from-pink-500 to-rose-600",
  },
  {
    title: "Local Development",
    description:
      "Supporting sustainable development projects for long-term prosperity",
    icon: Leaf,
    color: "from-emerald-500 to-green-600",
  },
];

export default function ImpactSection() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50" id="impact">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why This Fund Matters
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Your donation supports meaningful changes across Hawassa City
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {IMPACTS.map((impact) => {
            const IconComponent = impact.icon;
            return (
              <div
                key={impact.title}
                className="bg-white rounded-xl p-8 hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div
                  className={`w-14 h-14 rounded-full bg-gradient-to-br ${impact.color} flex items-center justify-center mb-6`}
                >
                  <IconComponent className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {impact.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {impact.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
