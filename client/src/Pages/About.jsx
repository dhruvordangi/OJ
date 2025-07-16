import { Target, Users, Globe, Heart, Lightbulb } from "lucide-react"

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Mission Driven",
      description:
        "We are committed to empowering teams and individuals to achieve their goals through innovative technology solutions.",
    },
    {
      icon: Users,
      title: "People First",
      description:
        "Our users are at the heart of everything we do. We build products that truly make a difference in their daily lives.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We constantly push the boundaries of what's possible, embracing new technologies and creative solutions.",
    },
    {
      icon: Heart,
      title: "Passion",
      description:
        "We love what we do and it shows in every product we create and every interaction we have with our community.",
    },
  ]

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Former tech executive with 15+ years of experience building scalable platforms.",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Full-stack engineer passionate about creating elegant solutions to complex problems.",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Design",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Award-winning designer focused on creating intuitive and beautiful user experiences.",
    },
    {
      name: "David Kim",
      role: "Head of Product",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Product strategist with a track record of launching successful digital products.",
    },
  ]

  const milestones = [
    { year: "2020", event: "Company Founded", description: "Started with a vision to simplify team collaboration" },
    { year: "2021", event: "First 1K Users", description: "Reached our first major user milestone" },
    { year: "2022", event: "Series A Funding", description: "Raised $10M to accelerate growth" },
    { year: "2023", event: "Global Expansion", description: "Expanded to serve users in 50+ countries" },
    { year: "2024", event: "100K+ Users", description: "Celebrating our growing community" },
  ]

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          About Our
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Journey
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          We're a passionate team of innovators, designers, and engineers dedicated to building tools that empower teams
          to do their best work. Our story began with a simple idea: make collaboration effortless and enjoyable.
        </p>
      </section>

      {/* Stats Section */}
      <section className="bg-white rounded-3xl p-8 md:p-16 shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">4+</div>
            <div className="text-gray-600 font-medium">Years of Innovation</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-600 mb-2">100K+</div>
            <div className="text-gray-600 font-medium">Happy Users</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
            <div className="text-gray-600 font-medium">Countries Served</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-orange-600 mb-2">99.9%</div>
            <div className="text-gray-600 font-medium">Uptime</div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            These principles guide everything we do and shape the culture we've built.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg card-hover border border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="text-white w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Timeline Section */}
      <section>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From a small startup to a global platform, here are the key milestones in our story.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                  <div className="bg-white p-6 rounded-2xl shadow-lg card-hover border border-gray-100">
                    <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.event}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>

                <div className="relative z-10">
                  <div className="w-4 h-4 bg-white border-4 border-blue-500 rounded-full"></div>
                </div>

                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The passionate individuals behind our success, working together to build something amazing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg card-hover border border-gray-100 text-center"
            >
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-blue-600 font-medium mb-3">{member.role}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section>
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-16 text-white text-center">
          <Globe className="w-16 h-16 mx-auto mb-6 text-blue-200" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals who share our passion for innovation and excellence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="w-full sm:w-auto bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200">
              View Open Positions
            </button>
            <button className="w-full sm:w-auto border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors duration-200">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
