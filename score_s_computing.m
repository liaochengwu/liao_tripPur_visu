function score_s=score_s_computing(k_s,taxi_s_dis,k_s_uniq)
score_s=zeros(1,9);
popu=-log2(1-k_s/(sum(k_s(:))+1));
beta=0.9;
for i1=1:length(k_s)%遍历每个type
    if k_s_uniq(i1)~=0
        s_uniq=-log2((k_s_uniq(i1)+1)/(sum(k_s_uniq)+1));
    else
        s_uniq=0;
    end
    dis_avg=sum(taxi_s_dis(i1,:))/(1+k_s(i1));
    score_s(i1)=100*(beta*popu(i1)+(1-beta)*s_uniq)/(1+dis_avg);%乘以100使数字大一点
end
%score_s=mapminmax(score_s,0,1);%归一化
      
