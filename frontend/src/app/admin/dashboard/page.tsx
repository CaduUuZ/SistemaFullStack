export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <Card title="Usuários" value="120" color="blue" />
        <Card title="Produtos" value="45" color="green" />
        <Card title="Vendas" value="R$ 12.300" color="purple" />
      </div>
    </div>
  );
}

function Card({ title, value, color }: any) {
  const colors: any = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    purple: "bg-purple-100 text-purple-700",
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-3xl font-bold mt-2">{value}</h2>
      </div>

      <div className={`p-3 rounded-xl ${colors[color]}`}>
        📊
      </div>
    </div>
  );
}