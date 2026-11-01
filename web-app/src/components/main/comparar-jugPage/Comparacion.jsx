import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';


function Comparacion({datCompPlayer}){


    const[datosComp, setDatosComp]= useState(datCompPlayer);

        useEffect(() => {
            const datosConConteoNumerico = datCompPlayer.map(item => ({
                ...item,
                conteo: Number(item.conteo)
            }));
            setDatosComp(datosConConteoNumerico);
        }, [datCompPlayer]);

        const RADIAN = Math.PI / 180;
        const renderCustomizedLabel = ({
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            percent
        }) => {
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);
        
            return (
            <text
                x={x}
                y={y}
                fill="#162017"
                fontWeight={600}
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
            );
        };
return(

    <div className='comparison-chart'>
        {datosComp.every(item => item.conteo === 0) ? (
            <p className="text-white">No hay resultados registrados para esta selección.</p>
        ) : (
        <ResponsiveContainer >
            <PieChart>
                <Pie 
                    dataKey="conteo"
                    data={datosComp}
                    fill="#8884d8"
                    cx="50%"
                    cy="50%"
                    innerRadius="52%"
                    outerRadius="82%"
                    paddingAngle={3}
                    stroke="none"
                    labelLine={false}
                    label={renderCustomizedLabel}
                >
                    {datosComp.map((entry,index)=>(
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    
                    ))}

                </Pie>
            </PieChart>
        </ResponsiveContainer>
        )}

    </div>
)
}
export default Comparacion;




