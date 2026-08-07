// app/layout.js
export const metadata = {
  title: 'CashFlow365 AI Controller',
  description: 'Live AI controller answering financial questions grounded in real category data.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#f4f6f8' }}>{children}</body>
    </html>
  );
}
