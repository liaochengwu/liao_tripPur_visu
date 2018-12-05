function flag=dis_node(node1_lat,node1_lon,node2_lat,node2_lon)
%忘记将度数转化
R = 6370000;
beta=abs(node1_lat - node2_lat);
aefa=abs(node1_lon - node2_lon);
%flag=R * ( sqrt( beta^2 + aefa^2 )* pi/180.0 );
flag=R * ( sqrt( beta.^2 + aefa.^2 )* pi/180.0 );
%flag=sqrt( beta^2 + aefa^2);
end 