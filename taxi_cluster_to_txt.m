Idx_5=zeros(99970,1);
for index=1:99970
    if Idx(index)==8 || Idx(index)==2
        Idx_5(index)=1;
    elseif Idx(index)==7 || Idx(index)==6
        Idx_5(index)=2;
    elseif Idx(index)==3
        Idx_5(index)=3;
    elseif Idx(index)==1 || Idx(index)==5
        Idx_5(index)=4;
    elseif Idx(index)==4
        Idx_5(index)=5;
    end
end
%合并出租车信息和分类信息，写入文件
taxi_manhattan_cluster=taxi_manhattan_combined(index_all,:);
taxi_manhattan_cluster(:,10)=num2cell(Idx_5);
path="./taxi_manhattan_cluster.txt";
f=fopen(path,'w+');
for row = 1:99970
    fprintf(f,'%d,%s,%s,%f,%f,%d,%f,%f,%d,%d\n',taxi_manhattan_cluster{row,:});
end
fclose(f);
