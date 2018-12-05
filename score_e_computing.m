function score_e=score_e_computing(k_e,taxi_e_dis,k_e_uniq)
%function score_e=score_e_computing(k_e,k_e_4h,taxi_e_dis,taxi_e_dis_4h,k_e_uniq,k_e_4h_uniq)
score_e=zeros(1,9);
popu=-log2(1-k_e/(sum(k_e)+1));
%popu_4h=-log2(1-k_e_4h/(sum(k_e_4h)+1));%4h前
%alpha=0.9;
beta=0.9;
for i1=1:length(k_e)%遍历每个type
    if k_e_uniq(i1)~=0
        e_uniq=-log2((k_e_uniq(i1)+1)/(sum(k_e_uniq)+1));
    else
        e_uniq=0;
    end
    dis_avg=sum(taxi_e_dis(i1,:))/(1+k_e(i1));
    score_e(i1)=100*(beta*popu(i1)+(1-beta)*e_uniq)/(1+dis_avg); 
end
% for i1=1:length(k_e)%遍历每个type
%     if k_e_uniq(i1)~=0
%         e_uniq=-log2((k_e_uniq(i1)+1)/(sum(k_e_uniq)+1));
%     else
%         e_uniq=0;
%     end
%     if k_e_4h_uniq(i1)~=0
%         e_4h_uniq=-log2((k_e_4h_uniq(i1)+1)/(sum(k_e_4h_uniq)+1));
%     else
%         e_4h_uniq=0;
%     end
%     dis_avg=sum(taxi_e_dis(i1,:))/(1+k_e(i1));
%     dis_avg_4h=sum(taxi_e_dis_4h(i1,:))/(1+k_e_4h(i1));
%     score_e(i1)=alpha*100*(beta*popu(i1)+(1-beta)*e_uniq)/(1+dis_avg) + (1-alpha)*100*(beta*popu_4h(i1)+(1-beta)*e_4h_uniq)/(1+dis_avg_4h);    
% end
%score_e=mapminmax(score_e,0,1);%归一化