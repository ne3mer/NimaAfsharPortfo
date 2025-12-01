export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background pt-20 pb-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        <div className="prose prose-invert prose-lg">
          <p className="text-muted-foreground mb-6">Last updated: November 30, 2025</p>
          
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Introduction</h2>
          <p className="text-muted-foreground mb-4">
            Welcome to NIMA Studio. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Data We Collect</h2>
          <p className="text-muted-foreground mb-4">
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
            <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data</strong> includes email address and telephone number.</li>
            <li><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. How We Use Your Data</h2>
          <p className="text-muted-foreground mb-4">
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
